import streamlit as st
import torch
from transformers import (
    pipeline
)
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms.huggingface_pipeline import HuggingFacePipeline

# @st.cache(allow_output_mutation=True)
# def get_model():
#     tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
#     model = BertForSequenceClassification.from_pretrained("pnichite/YTFineTuneBert")
#     return tokenizer,model


# tokenizer,model = get_model()

user_input = st.text_area('Enter Text to Analyze')
button = st.button("Analyze")

# d = {
    
#   1:'Toxic',
#   0:'Non Toxic'
# }

if user_input and button :
    pipeline = pipeline(
        "text-generation", #task
        model="naqib3110/llama-2-7b-chat-whazzat",
        tokenizer="naqib3110/llama-2-7b-chat-whazzat",
        torch_dtype=torch.bfloat16,
        trust_remote_code=True,
        device_map="auto",
        max_length=250,
        do_sample=True,
        top_k=10,
    )
    template = """
           You are an expert product recommender,
           You can generate product recommendations based on simple description of users' need.
           Recommend products that are as relevant as possible .
           Recommend only 5 products.
           Do not generate additional prompt as a user
           Only generate 1 array for the asked usecase
           Return nothing but an array of 5 items. Leave out any extra words that have nothing to do with the product names.

           example,
           USER: something to clean my house
           PRODUCT RECOMMENDER: ['Vacuum Cleaner','Mop and Bucket','Broom and Dustpan','Steam Cleaner','Robot Vacuum'].

           USER: {query}
           PRODUCT RECOMMENDER:
           """
    llm = HuggingFacePipeline(pipeline=pipeline,model_kwargs={'temperature':1})
    prompt = PromptTemplate(template=template, input_variables=["query"])
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    # test_sample
    result = llm_chain.run(user_input)
    print(result.split('.')[0])
    st.write("Result: ",result.split('.')[0].split('\n')[0])
    # y_pred = np.argmax(output.logits.detach().numpy(),axis=1)
    # st.write("Prediction: ",d[y_pred[0]])