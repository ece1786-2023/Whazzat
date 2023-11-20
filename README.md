# Whazzat

We built the backend in nodejs, to make it easier to deploy in Firebase functions.

We used https://rapidapi.com/axesso/api/axesso-amazon-data-service1/ to fetch products from amazon. Although it is a bit slow (API response time is around 4s), but we are getting good output.

We used appsmith to host our frontend https://app.appsmith.com/app/whazzat/home-6556f707c8bcd467b929daa4 

Currently dummy data for fork and spoon will come for any prompt.

The initial Llama2 model that we are using in google colab is in this repo, named as fine_tune_llama2
We are using peft (parameter efficient fine tuning) to be able to run and finetune the Llama2 model in google colab's free edition. If it does not go as planned we will use paid edition.