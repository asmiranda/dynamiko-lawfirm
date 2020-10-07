#!/bin/sh

# This stuff will be ignored by systems that don't use chkconfig.
# chkconfig: 345 87 13
# description: Room Signal database
# pidfile: /opt/DynamikoService/bin/DynamikoService.pid
# config: 

### BEGIN INIT INFO
# Provides:          DynamikoService-Server
# Required-Start:    
# Required-Stop:
# Default-Start:     3 5
# Default-Stop:      0 1 2 6
# Short-Description: DynamikoService-Server
# Description:       DynamikoService database service
### END INIT INFO

# Starts and stops the room signal

# Some general variables
SERVICE_HOME=/home/alex/innovation/dynamiko
#JVM_OPTS="-DfunctionsInSchema=true"
JVM_OPTS=""

# starts DynamikoService server
DynamikoService_start () {

     if [ -e $SERVICE_HOME/DynamikoService.pid ]; then
        echo "ROOM SIGNAL is still running"
        exit 1
     fi

     /etc/init.d/h2-service.sh start
     /etc/init.d/room-service.sh start
     cd $SERVICE_HOME/dynamiko-all

     # this will start DynamikoService server with allowed tcp connection
     # you can find more info in DynamikoService tutorials

     export MAVEN_OPTS=-Xmx1512m
     sudo nohup mvn -Dspring-boot.run.profiles=all -DskipTest=true spring-boot:run -P all &

     echo $! > $SERVICE_HOME/DynamikoService.pid
     sleep 3
     echo "DynamikoService started. Setting multithreaded"

}

# stops DynamikoService
DynamikoService_stop () {
     if [ -e $SERVICE_HOME/DynamikoService.pid ]; then
         PID=$(cat $SERVICE_HOME/DynamikoService.pid)
         kill -TERM ${PID}
         echo SIGTERM sent to process ${PID}
         rm $SERVICE_HOME/DynamikoService.pid
     else
         echo File $SERVICE_HOME/DynamikoService.pid not found!
     fi
}

# Just to remove pid file in case you killed DynamikoService manually 
# and want to start it by script, but he thinks
# that DynamikoService is already running
DynamikoService_zap () {
     rm $SERVICE_HOME/DynamikoService.pid
}

case "$1" in
    init)
      DynamikoService_start
      ;;
    start)
      DynamikoService_start -ifExists
      ;;
    stop)
      DynamikoService_stop
      ;;
    zap)
      DynamikoService_zap
      ;;
    restart)
      DynamikoService_stop
      sleep 5
      DynamikoService_start -ifExists
      ;;
    *)
      echo "Usage: /etc/init.d/dynamiko-service.sh {init|start|stop|restart}"
      exit 1
      ;;
esac

exit 0