import tensorflow as tf
import os

# Path to your existing model
original_model_path = 'model.h5'
output_dir = 'optimized_model'

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Load your existing model
print("Loading original model...")
model = tf.keras.models.load_model(original_model_path)
print("Model loaded successfully!")

# OPTION 1: Convert to TensorFlow SavedModel format (good balance of speed and accuracy)
saved_model_path = os.path.join(output_dir, 'saved_model')
print(f"Converting to SavedModel format and saving to {saved_model_path}...")
tf.saved_model.save(model, saved_model_path)
print("SavedModel conversion complete!")

# OPTION 2: Convert to TensorFlow Lite with post-training quantization
# This creates a significantly smaller model with minimal accuracy loss
print("Converting to TFLite with quantization...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
# For slightly better accuracy but larger size, use:
converter.target_spec.supported_types = [tf.float16]
tflite_model = converter.convert()

# Save the TFLite model
tflite_model_path = os.path.join(output_dir, 'model_optimized.tflite')
with open(tflite_model_path, 'wb') as f:
    f.write(tflite_model)
print(f"TFLite model saved to {tflite_model_path}")

# OPTION 3: Convert to TensorFlow.js format (if using in web applications)
# Uncomment if needed
# import tensorflowjs as tfjs
# tfjs_path = os.path.join(output_dir, 'tfjs_model')
# tfjs.converters.save_keras_model(model, tfjs_path)
# print(f"TensorFlow.js model saved to {tfjs_path}")

# Print model size comparisons
original_size = os.path.getsize(original_model_path) / (1024 * 1024)
tflite_size = os.path.getsize(tflite_model_path) / (1024 * 1024)
print(f"Original model size: {original_size:.2f} MB")
print(f"TFLite model size: {tflite_size:.2f} MB")
print(f"Size reduction: {(1 - tflite_size/original_size) * 100:.2f}%")

print("\nOptimization complete! Use one of these lighter models in your application.")

