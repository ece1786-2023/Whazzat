import os
import pandas as pd
import pyarrow as pa
import pyarrow.dataset as ds
from datasets import Dataset

def remove_characters(input_filename='Data/dataset.txt',output_filename='Data/cleaned_dataset.txt'):
    file=open(input_filename, encoding="utf8")
    file_out=open(output_filename,'w',encoding='utf8')
    lines=file.readlines()
    # count=1
    for line in lines:
        line=line.strip()
        temp_line=''
        for char in line:
            if (char.isalpha() or char.isspace() or char==','):
                temp_line = temp_line + char
        # print(temp_line)
        file_out.write(temp_line+'\n')
        # count+=1
    file.close()
    file_out.close()

def remove_redundancies(input_filename='Data/cleaned_dataset.txt',output_filename='Data/unique_dataset.txt'):
    file=open(input_filename, encoding="utf8")
    file_out=open(output_filename,'w',encoding='utf8')
    lines=file.readlines()
    # count=1
    arr=[0]*(len(lines)+1)
    for idx, line in enumerate(lines):
        input=line.lower().split(',')[0]
        for jdx, j in enumerate(lines[idx+1:]):
            if (j.lower().split(',')[0] == input):
                arr[jdx+idx+1]=1
                # count+=1
        if arr[idx] == 0:
            file_out.write(line.lower()) 
    file.close()
    file_out.close()
    os.remove(input_filename)
   



# def create_dataset(input_filename='Data/unique_dataset.txt'):
#     file=open(input_filename, encoding="utf8")
#     lines=file.readlines()
#     input_arr=[]
#     output_arr=[]
#     joined_arr=[]
#     for line in lines:

#         input=line.split(',')[0]
#         output=line.split(',',1)[-1]
#         input_arr.append(input)
#         output_arr.append(output)
#         joined_arr.append(f'<s>[INST] {input} [/INST] {output}</s')


#     ### convert to Huggingface dataset ###
#     # df = pd.DataFrame({'input': input_arr, 'output': output_arr})
#     df = pd.DataFrame({'text': joined_arr})
#     data = ds.dataset(pa.Table.from_pandas(df).to_batches())

    
#     dataset = Dataset(pa.Table.from_pandas(df))
#     file.close()
#     # os.remove(input_filename)
#     print(type(dataset))
#     print(dataset[0])

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