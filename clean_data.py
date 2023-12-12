import os
import pandas as pd
import pyarrow as pa
import pyarrow.dataset as ds
from datasets import Dataset

#function to remove unnecessary characters
def remove_characters(input_filename='Data/preprocessed_dataset.txt',output_filename='Data/cleaned_dataset.txt'):
    file=open(input_filename, encoding="utf8")
    file_out=open(output_filename,'w',encoding='utf8')
    lines=file.readlines()
    for line in lines:
        line=line.strip()
        temp_line=''
        for char in line:
            if (char.isalpha() or char.isspace() or char==','):
                temp_line = temp_line + char
        file_out.write(temp_line+'\n')
    file.close()
    file_out.close()

#function to remove redundancies
def remove_redundancies(input_filename='Data/cleaned_dataset.txt',output_filename='Data/unique_dataset.txt'):
    file=open(input_filename, encoding="utf8")
    file_out=open(output_filename,'w',encoding='utf8')
    lines=file.readlines()
    arr=[0]*(len(lines)+1)
    for idx, line in enumerate(lines):
        input=line.lower().split(',')[0]
        for jdx, j in enumerate(lines[idx+1:]):
            if (j.lower().split(',')[0] == input):
                arr[jdx+idx+1]=1
        if arr[idx] == 0:
            file_out.write(line.lower()) 
    file.close()
    file_out.close()
    os.remove(input_filename)
   
#function to format dataset for model fine-tuning
def create_dataset(input_filename='data/unique_dataset.txt'):
  file = open(input_filename,'r')
  file_out=open('data/model_data.txt','w')
  for i in file:
    i=i.replace('\n','')
    str=i.split(',')
    for idx,v in enumerate(str):
      str[idx]=str[idx].strip()    
    # print(f'{str[1:]}')
    # str[-1]=str[-1].lstrip()
    line = f'<s>[INST]{str[0]}[/INST]{str[1:]}</s>'
    file_out.write(line+'\n')
  file.close()
  file_out.close()
  os.remove(input_filename)

remove_characters()
remove_redundancies()
create_dataset()