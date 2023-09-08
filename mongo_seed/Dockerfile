FROM mongo:5.0
ARG DATABASE_URI
ARG USERNAME
ARG PASSWORD

ENV DATABASE_URI ${DATABASE_URI}
ENV USERNAME ${USERNAME}
ENV PASSWORD ${PASSWORD}

COPY dblp.json /dblp.json

CMD mongoimport --db=DBLP --collection=publis --file=dblp.json -u root -p example --host=mongo --port=27017 --authenticationDatabase admin