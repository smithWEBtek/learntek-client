FROM node:8.16.1

WORKDIR /usr/src/learntek-client

COPY ./ ./

CMD ["/bin/bash"]
