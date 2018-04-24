package com.beppe.javase.test;

import org.junit.Test;

import java.util.concurrent.CountDownLatch;

public class MultiThreadDemo extends  Thread{

    private  volatile  int  ticket=10;

    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            if(ticket>0){
                System.out.println("ticket"+ticket--);
            }
        }
    }

    @Test
    public void test1() throws InterruptedException {
        MultiThreadDemo m=new MultiThreadDemo();
        Thread t1= new Thread(m);
        Thread t2= new Thread(m);
        Thread t3= new Thread(m);
        t1.start();
        t2.start();
        t3.start();
        Thread.sleep(1000);
    }

    @Test
    public void test2() throws InterruptedException {
        final Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                printNumber("A:");
            }
        });
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("B线程开始等待A线程");
                try {
                    t1.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                printNumber("B:");
            }
        });
        t1.start();
        t2.start();
        Thread.sleep(1000);
    }

    private static void printNumber(String threadName) {
        int i=0;
        while (i++ < 3) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(threadName + "print:" + i);
        }
    }


// 线程之间的通信  A线程 打印 1 后 B 线程打印 1 2 3 然后 A线程打印 2 3
    @Test
    public void test3() throws InterruptedException {
        final Object lock=new Object();
        Thread A = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("INFO: A 等待锁");
                synchronized (lock) {
                    System.out.println("INFO: A 得到了锁 lock");
                    System.out.println("A 1");
                    try {
                        System.out.println("INFO: A 准备进入等待状态，放弃锁 lock 的控制权");
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("INFO: 有人唤醒了 A, A 重新获得锁 lock");
                    System.out.println("A 2");
                    System.out.println("A 3");
                }
            }
        });

        Thread B = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("INFO: B 等待锁");
                synchronized (lock) {
                    System.out.println("INFO: B 得到了锁 lock");
                    System.out.println("B 1");
                    System.out.println("B 2");
                    System.out.println("B 3");
                    System.out.println("INFO: B 打印完毕，调用 notify 方法");
                    lock.notify();
                }
            }
        });
        A.start();
        B.start();
    }

//四个线程 A B C D，其中 D 要等到 A B C 全执行完毕后才执行，而且 A B C 是同步运行的
    @Test
    public void test4() throws InterruptedException {
        int worker = 3;
        //计数器
        CountDownLatch countDownLatch = new CountDownLatch(worker);

    }


}
