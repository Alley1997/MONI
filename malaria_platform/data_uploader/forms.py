from django import forms

DATA_TYPE_CHOICES = [
    ('human', 'Human Health'),
    ('animal', 'Animal Health'),
    ('environment', 'Environmental Data'),
]

class DataUploadForm(forms.Form):
    data_file = forms.FileField(label="Upload Data File")
    data_type = forms.ChoiceField(choices=DATA_TYPE_CHOICES, label="Data Type")
