import zipfile
import os

def unzip_and_delete(zip_file_path):
    """
    Unzips a file in its current directory and deletes the zip file.

    :param zip_file_path: Path to the zip file.
    """
    # Get the directory of the zip file
    output_dir = os.path.dirname(zip_file_path)

    # Unzip the file
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(output_dir)
        print(f"Dataset extracted to: {output_dir}")

    # Delete the zip file
    os.remove(zip_file_path)
    print(f"Deleted zip file: {zip_file_path}")

# Example usage:
zip_file_path = "archive.zip"  # Replace with your zip file path

unzip_and_delete(zip_file_path)
