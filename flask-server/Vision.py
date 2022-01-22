import io
import os

# Imports the Google Cloud client library
from google.cloud import vision

# Instantiates a client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate
file_name = os.path.abspath('./assets/christmas.jpeg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = vision.Image(content=content)

# Performs label detection on the image file
response_logos = client.logo_detection(image=image)
logos = response_logos.logo_annotations[0:3]

response_text = client.text_detection(image=image)
text = response_text.text_annotations[0:3]

response_labels = client.label_detection(image=image)
labels = response_labels.label_annotations[0:3]

print('Logos:')
for logo in logos:
    print(logo.description)

print('Text:')
for txt in text:
    print(txt.description)

print('Labels:')
for label in labels:
    print(label.description)