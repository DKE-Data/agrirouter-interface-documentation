#!/bin/bash

# Define the path to the folder (current directory if not provided)
folderPath=./images

# Find all files and loop through them
find "$folderPath" -type f | while read -r file; do
    # Extract the filename and extension
    extension="${file##*.}"
    base="${file%.*}"

    # Check if the extension contains uppercase letters
    if [[ "$extension" =~ [A-Z] ]]; then
        # Convert the extension to lowercase
        intmFile="${base}_.${extension,,}"
        newFile="${base}.${extension,,}"
        
        # Rename the file using git mv
        echo "Start $file to $newFile"
        echo "Fist $file to $intmFile"
        git mv "$file" "$intmFile"
        echo "Then $intmFile to $newFile"
        git mv "$intmFile" "$newFile"
    fi
done

echo "All files with uppercase extensions have been renamed."
