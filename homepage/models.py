from django.db import models

DEFAULT_SOURCE_ID = 1
DEFAULT_PLACEHOLDER = "N/A"

class CelegansSirna(models.Model):
    sequence = models.CharField(max_length=45)
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class CelegansBed(models.Model):
    chr_num = models.CharField(max_length=50, default=DEFAULT_PLACEHOLDER)
    startPos = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    endPos = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    sirname = models.CharField(max_length=50, default=DEFAULT_PLACEHOLDER)
    sign = models.CharField(max_length=1, default="?")
    author = models.CharField(max_length=100, default=DEFAULT_PLACEHOLDER)
    stage = models.CharField(max_length=100, default=DEFAULT_PLACEHOLDER)
    pubmed_id = models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.author

