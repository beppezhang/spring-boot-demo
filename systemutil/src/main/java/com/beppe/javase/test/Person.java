package com.beppe.javase.test;

public class Person {
    private int id = 0;
    private String name = "";
    private int height = 0;

    @Override
    public int hashCode() {
//        System.out.println("调用了重写前的 hashcode 方法");
//        return super.hashCode();
        System.out.println("调用了重写后的 hashcode 方法");
        return this.name.hashCode() + this.height;// 重写的地方
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "id:" + id + "; Name:" + this.name + "; height:" + this.height;
    }

    @Override
    public boolean equals(Object obj) {
        System.out.println("调用了重写后的equals 方法");
//        System.out.println("id:" + id + ", equals invokes");
        return super.equals(obj);
    }
}
