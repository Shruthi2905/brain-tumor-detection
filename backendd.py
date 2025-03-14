import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import time

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("tumor_classifier_api.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Class labels
CLASS_LABELS = ['glioma_tumor', 'meningioma_tumor', 'no_tumor', 'pituitary_tumor']

# Global interpreter variable
interpreter = None

# Load model at startup
def load_model():
    global interpreter
    try:
        model_path = "brain_tumor_classifier.tflite"
        logger.info(f"Loading TFLite model from: {model_path}")
        
        # Load TFLite model
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        
        logger.info("TFLite model loaded successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to load TFLite model: {str(e)}")
        return False

# The single endpoint that handles everything
@app.route('/predict', methods=['POST'])
def predict():
    global interpreter
    start_time = time.time()
    logger.info("Received prediction request")
    
    # Load model if not already loaded
    if interpreter is None:
        logger.info("Model not loaded yet, loading now...")
        success = load_model()
        if not success:
            return jsonify({"error": "Failed to load model"}), 500
    
    try:
        # Check if file was uploaded
        if 'image' not in request.files:
            logger.error("No image file in request")
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        if file.filename == '':
            logger.error("Empty filename provided")
            return jsonify({"error": "No image selected"}), 400
        
        # Log the received file details
        logger.info(f"Processing file: {file.filename}, size: {request.content_length} bytes")
        
        # Process the image
        try:
            logger.info("Starting image preprocessing")
            preprocess_start = time.time()
            
            # Read and preprocess the image
            img = Image.open(io.BytesIO(file.read()))
            
            # Convert to RGB if not already
            if img.mode != "RGB":
                img = img.convert("RGB")
                
            # Resize image to match model input shape (most models use 224x224 or similar)
            img = img.resize((224, 224))
            
            # Convert to numpy array and normalize
            img_array = np.array(img) / 255.0
            
            # Expand dimensions for model input
            img_array = np.expand_dims(img_array, axis=0).astype(np.float32)
            
            logger.info(f"Image preprocessing completed in {time.time() - preprocess_start:.3f} seconds")
        except Exception as e:
            logger.error(f"Image processing error: {str(e)}")
            return jsonify({"error": "Failed to process the image"}), 400
        
        # Make prediction
        try:
            logger.info("Starting prediction")
            predict_start = time.time()
            
            # Get input and output tensors
            input_details = interpreter.get_input_details()
            output_details = interpreter.get_output_details()
            
            # Set input tensor
            interpreter.set_tensor(input_details[0]['index'], img_array)
            
            # Run inference
            interpreter.invoke()
            
            # Get prediction results
            predictions = interpreter.get_tensor(output_details[0]['index'])
            
            predicted_class_index = np.argmax(predictions[0])
            predicted_class = CLASS_LABELS[predicted_class_index]
            confidence = float(predictions[0][predicted_class_index])
            
            # Create probabilities dictionary to match frontend
            probabilities = {CLASS_LABELS[i]: float(predictions[0][i]) for i in range(len(CLASS_LABELS))}
            
            logger.info(f"Prediction completed in {time.time() - predict_start:.3f} seconds")
            logger.info(f"Prediction: {predicted_class} with confidence {confidence:.4f}")
            logger.info(f"Total processing time: {time.time() - start_time:.3f} seconds")
            
            # Return the results
            return jsonify({
                "prediction": predicted_class,
                "confidence": confidence,
                "probabilities": probabilities
            })
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return jsonify({"error": "Error during prediction process"}), 500
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    # Load model at startup instead of on first request
    
    port = int(os.environ.get("PORT", 5000))
    logger.info(f"Starting server on port {port}")
    app.run(host='0.0.0.0', port=port)