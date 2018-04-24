package com.beppe.javase.test;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class MyInvocationHandler implements InvocationHandler {

//    需要被代理的类  目标类
    private Object subject;

    public MyInvocationHandler(Object subject) {
        this.subject = subject;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("代理之前-------执行的语句");
        Object invoke = method.invoke(subject, args);
        System.out.println("代理之后-------执行的语句");
        return invoke;
    }



}
