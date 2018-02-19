from django.db import models

DEFAULT_SOURCE_ID = 1
DEFAULT_STAGE = "N/A"

class CelegansSource(models.Model):
    author = models.CharField(max_length=100)
    pubmed_id = models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.author

class CelegansSirna(models.Model):
    sequence = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    stage = models.CharField(max_length=100, default=DEFAULT_STAGE)
    source = models.ForeignKey("CelegansSource", on_delete=models.CASCADE, default=DEFAULT_SOURCE_ID)
    def __str__(self):
        return self.name

class SusDomesticusSource(models.Model):
    author = models.CharField(max_length=100)
    pubmed_id = models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.author

class SusDomesticusSirna(models.Model):
    sequence = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    stage = models.CharField(max_length=100, default=DEFAULT_STAGE)
    source = models.ForeignKey("CelegansSource", on_delete=models.CASCADE, default=DEFAULT_SOURCE_ID)
    def __str__(self):
        return self.name
