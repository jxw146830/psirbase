from django.db import models

DEFAULT_SOURCE_ID = 1
DEFAULT_PLACEHOLDER = "N/A"

class CelegansSirna(models.Model):
    sequence = models.CharField(max_length=50)
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class CelegansBed(models.Model):
    chr_num = models.CharField(max_length=10, default=DEFAULT_PLACEHOLDER)
    start = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    end = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    name = models.CharField(max_length=30, default=DEFAULT_PLACEHOLDER)
    strand = models.CharField(max_length=1, default="?")
    stage = models.CharField(max_length=50, default=DEFAULT_PLACEHOLDER)
    source = models.CharField(max_length=50, default=DEFAULT_PLACEHOLDER)
    pubmed_id = models.CharField(max_length=12, blank=True, null=True)
    target_mrna = models.CharField(max_length=50, default=DEFAULT_PLACEHOLDER)
    def __str__(self):
        return self.name

class CelegansMrna(models.Model):
    chr_num = models.CharField(max_length=10, default=DEFAULT_PLACEHOLDER)
    start = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    end = models.CharField(max_length=20, default=DEFAULT_PLACEHOLDER)
    name = models.CharField(max_length=30, default=DEFAULT_PLACEHOLDER)
    strand = models.CharField(max_length=1, default="?")

class CelegansChrSliceI(models.Model):
    start = models.IntegerField()
    end = models.IntegerField()
    sequence = models.CharField(max_length=100, default=DEFAULT_PLACEHOLDER)
