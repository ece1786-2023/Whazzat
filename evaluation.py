import csv
import pandas as pd
from openai import OpenAI

client = OpenAI()
system_prompt = "Act as a classifier. Give a negative output if given products are not relevant to the product description. Give a positive output if the products are relevant to the given product description."

df = pd.read_csv("sample_data.csv")
output=[]
input=list(df.input)
output1=list(df.output1)
output2=list(df.output2)
for i,j,k in zip(input,output1,output2):
    message=f'Input: {i}. Output: {j},{k}'
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]
    )
    response = completion.choices[0].message.content
    output.append(response)
    count=0
    for i in output:
        if i == 'Positive':
            count+=1
print('Accuracy:',count/len(output)*100)


