package com.beppe.rabbit;


import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

//@Component
public class Receive {

    @RabbitListener(queues = "hello1")
    public void processMessage(String content) {
        // ...
        System.out.println(content);
        System.out.println();
    }
}

