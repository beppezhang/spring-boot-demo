package com.beppe.javase.test;

public class User implements IUser{

    private int id;

    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
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

//    @Override
//    public int compareTo(User o) {
//        if(id<o.id){
//            return -1;
//        }
//        if(id>o.id){
//            return 1;
//        }
//        return 0;
//    }

    public  void eat(){
        System.out.println("i am eating sth!!");
    }
}
