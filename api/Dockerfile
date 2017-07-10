FROM golang:1.8

WORKDIR /go/src/puka
COPY . .

RUN go-wrapper download
RUN go-wrapper install

ARG port

ENV PORT $port
ENV BASE_URL http://localhost:$port
ENV MONGODB_URI mongodb://puka_mongo/test

EXPOSE $port

CMD ["go-wrapper", "run"]
                                                     