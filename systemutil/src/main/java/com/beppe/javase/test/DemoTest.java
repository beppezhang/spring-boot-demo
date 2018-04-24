package com.beppe.javase.test;

import org.junit.Test;
import sun.java2d.SurfaceDataProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.util.*;
import java.util.concurrent.CountDownLatch;

public class DemoTest {

    @Test
    public void StringTest() {
        String s1 = "aa";
        String s2 = "aa";
        System.out.println(s1 == s2);

    }

    @Test
    public void threadTest1() {
        Thread threadA = new Thread((Runnable) () -> {

            System.out.println("开始打印线程A内容");
//            try {
//                Thread.sleep(1000);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
        });

        Thread threadB = new Thread((Runnable) () -> {
            System.out.println("开始等待A线程");

            try {
                threadA.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("开始打印线程B内容");
        });

        threadB.start();
        threadA.start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    //    A B C三个线程  顺序执行
    @Test
    public void threadTest2() {
//        Thread threadC = new Thread((Runnable) () -> {
//
//            System.out.println("开始打印线程A内容");
//
//        });
//        Thread threadB = new Thread((Runnable) () -> {
//            try {
//                threadC.join();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            System.out.println("开始打印线程B内容");
//
//        });
//        Thread threadA = new Thread((Runnable) () -> {
//            try {
//                threadB.join();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            System.out.println("开始打印线程C内容");
//
//        });
//
//        threadA.start();
//        threadB.start();
//        threadC.start();
//        try {
//            Thread.sleep(1000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//      线程 A 打印1 2 3 后 B 打印1 2 3 4 后 A 打印4
        Object lock = new Object();
        Thread threadA = new Thread((Runnable) () -> {
            System.out.println("线程A等待对象锁");
            synchronized (lock){
                System.out.println("线程A----1");
                System.out.println("线程A----2");
                System.out.println("线程A----3");
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("线程A----4");
            }

        });

        Thread threadB = new Thread((Runnable) () -> {
            System.out.println("线程B等待对象锁");
//            try {
//                threadA.join();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
            synchronized (lock){
                System.out.println("线程B----1");
                System.out.println("线程B----2");
                System.out.println("线程B----3");
                System.out.println("线程B----4");
                lock.notify();

            }

        });
        threadB.start();
        threadA.start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void threadTest3() {
        int work=3;
        CountDownLatch countDownLatch = new CountDownLatch(work);
        Thread threadD = new Thread((Runnable) () -> {
            System.out.println("线程D等待其他线程");
            try {
                countDownLatch.await();
                System.out.println("其他线程运行结束，D线程开始运行");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadD.start();
        for (int i = 0; i < 3; i++) {
            final int aa=i;
             Thread thread = new Thread((Runnable) () -> {
                System.out.println("线程"+aa+"正在运行");

                    countDownLatch.countDown();


            });
            thread.start();

        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Test
    public void collectionTest1(){
        ArrayList<User> users = new ArrayList<>();
        User user1 = new User(1,"beppe1");
        User user2 = new User(5,"beppe5");
        User user3 = new User(2,"beppe2");
        users.add(user1);
        users.add(user2);
        users.add(user3);
//        Collections.sort(users);
//        users.sort(new Comparator<User>() {
//            @Override
//            public int compare(User o1, User o2) {
//                if(o1.getId()>o2.getId()){
//                    return 1;
//                }
//                if(o1.getId()<o2.getId()){
//                    return -1;
//                }
//                return 0;
//            }
//        });
        for (User u:users) {
            System.out.println(u.getName());
        }
    }

    @Test
    public void javaseTest1(){
        IUser user = new User(1,"beppe1");
        InvocationHandler handler=new MyInvocationHandler(user);
        IUser o = (IUser)Proxy.newProxyInstance(user.getClass().getClassLoader(), user.getClass().getInterfaces(), handler);
        o.eat();
    }

    @Test
    public void hashTest1(){
        Map<Person, Dog> map = new HashMap<Person, Dog>();
        Person person_1 = new Person();
        person_1.setHeight(180);
        person_1.setId(1);
        person_1.setName("person_1");
        Person person_2 = new Person();
        person_2.setHeight(180);
        person_2.setId(2);
        person_2.setName("person_1");
        Dog dog_1 = new Dog();
        dog_1.setId(1);
        dog_1.setName("dog_1");
        Dog dog_2 = new Dog();
        dog_2.setId(2);
        dog_2.setName("dog_2");
        map.put(person_1, dog_1);
        map.put(person_2, dog_2);
        System.out.println("--" + map.get(person_1).getName());
        System.out.println("--" + map.get(person_2).getName());
    }


}
