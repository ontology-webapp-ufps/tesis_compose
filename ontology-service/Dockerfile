FROM python:3.8.9-slim-buster

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN pip install -r ./src/requirements.txt
RUN python -m pip install --upgrade pip

RUN python3 -m nltk.downloader all     
RUN python3 -m nltk.downloader -d /usr/local/share/nltk_data all    

# Expose port 5000
EXPOSE 5000

CMD ["python","app.py"]