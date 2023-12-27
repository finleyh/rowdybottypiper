# rowdybottypiper
## Build Commands

### From inside the project folder, run the following:
sudo docker build -t baggins . 

### deploying the built image
sudo docker run --cpus=2 -m 2048m -v /your/local/dir/for/output:/usr/app/output -d baggins

### monitoring execution
sudo docker ps --filter 'status=running'


### stopping execution
sudo docker stop $(sudo docker ps -q)
