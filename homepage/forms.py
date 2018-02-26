from django import forms

class SearchForm(forms.Form):
    species = forms.CharField(max_length=100, initial='no species selected...')
    species.widget = forms.HiddenInput(attrs={'id': 'speciesBox'})
    searchType = forms.CharField(initial='no search type selected...')
    searchType.widget = forms.HiddenInput(attrs={'id': 'searchTypeBox'})
    userInput = forms.CharField(max_length=50, label='')
    userInput.widget = forms.TextInput(attrs={'id': 'searchInputText', 'placeholder': 'Choose a search option first...', 'autocomplete': 'off',})
