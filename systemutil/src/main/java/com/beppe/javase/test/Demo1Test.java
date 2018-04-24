package com.beppe.javase.test;

import org.junit.Test;

import java.util.*;

public class Demo1Test {

    @Test
    public void test(){
        int[][] num = new int[100][100]; int n = 4; int count =1; for(int i=0;i<n;i++){ for(int j =0;j<n;j++){
            num[i][j]=count++;
        }
        }

        output(num,0,n-1);
    }

    public void output(int[][] num,int start,int end){
        if(start>=end || end<=0)return;
    for(int i=start;i<=end;i++){
        System.out.println(num[start][i]);
    } for(int i=start+1;i<=end;i++){
        System.out.println(num[i][end]);
    } for(int i=end-1;i>=start;i--){
        System.out.println(num[end][i]);
    } for(int i=end-1;i>start;i--){
        System.out.println(num[i][start]);
    }
        output(num,start+1,end-1);
    }

//    打印一个矩阵
    @Test
    public void test1(){
        int[][] num = new int[4][4];
        int n=4; //矩阵行数 ， 列数
        int count=1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <n ; j++) {
                num[i][j]=count++;
            }
        }
        System.out.println(num[2][3]);

    }

    public void out1(int[][] num,int start,int end){
        System.out.println();
    }

//冒泡排序
    @Test
    public void test2(){
        int[] arr={6,3,8,2,9,1};
        sort1(arr);
    }

    public void sort(int[] arr){
        for (int i = 0; i < arr.length-1; i++) {  //第一层控制排序趟数
            for (int j = 0; j <arr.length-1-i ; j++) { //第二层控制每趟排序次数
                if(arr[j]>arr[j+1]){
                    int tmp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=tmp;
                }
            }
        }
        System.out.println("=====================");
       for (int num:arr){
           System.out.println("排序后的数组是"+num);
       }
    }

//   直接排序
    public void sort1(int[] arr){
//        int temp=0;
        for (int i = 0; i < arr.length-1; i++) { //控制排序趟数
            int temp=i;
            for (int j = i+1; j <arr.length ; j++) {//控制次数
                if(arr[temp]>arr[j]){
                    temp=j;
                }
            }
            if(temp!=i){
                int aa=arr[temp];
                arr[temp]=arr[i];
                arr[i]=aa;
            }

        }
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }

//    二分法查找
    @Test
    public void test3(){
        int[] arr={1,3,8,10,14};
        int i=getValue(10, arr);
        System.out.println(i);
    }

    private int getValue(int des,int[] arr){
        int start=0;
        int end=arr.length-1;
        int mid=-1;
        while (start<=end){
            mid=(start+end)/2;
            if(arr[mid]==des){
                return mid;
            }else if(arr[mid]>des){
                end=mid-1;

            }else if(arr[mid]<des){
                start=mid+1;
            }

        }
        return -1;
    }


    //   冒泡排序
    @Test
    public void test4(){
        int[] arr={1,3,10,14,8};
        for (int i = 1; i < arr.length; i++) {
            for (int j = 1; j <arr.length-i ; j++) {
                if(arr[j]>arr[j+1]){
                    swap(arr,j,j+1);

                }

            }

        }
        System.out.println(Arrays.toString(arr));
    }

    //   选择排序
    @Test
    public void test5(){
        int[] arr={1,3,10,14,8};
        for (int i = 0; i < arr.length-1; i++) { //遍历的趟数
//            查出这一趟中最小值的索引
            int key=i;
            for (int j = key+1; j < arr.length; j++) {
                if (arr[key]>arr[j]){
                    key=j;
                }

            }
            if(key!=i){
                int temp=arr[i];
                arr[i]=arr[key];
                arr[key]=temp;
            }



        }
        System.out.println(Arrays.toString(arr));
    }

    private int minIndex(int[] arr,int key){

        for (int j = key; j <arr.length-1 ; j++) {
            if(arr[j]<arr[key]){
                key=j;
            }
        }
        return key;
    }





//    交换位置的方法
    private void swap(int[] arr,int i,int j){
        int temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;

    }


//    数据结构部分
    @Test
    public void test6(){
        int[] array = {35,17,39,9,28,65,56,87};
        NodeTree root = new NodeTree(array[0]);   //创建二叉树
        for(int i=1;i<array.length;i++){
            root.insert(root, array[i]);       //向二叉树中插入数据
        }
//        System.out.println("先根遍历：");
//        NodeQuery.preOrder(root);

        System.out.println("中根遍历：");
        NodeQuery.inOrder(root);
    }

//    @Test
//    public void test7(){
//        String temp="";
//        int count=1;
//        String str="aaabbccdd"; //打印 a3b2c2d2
//        char[] chars = str.toCharArray();
//        List list=getSet(str);
//
//        char[] setChars = set.toCharArray();
//        for (int i = 0; i <setChars.length ; i++) {
//            for (int j = 0; j <chars.length ; j++) {
//                while (setChars[i]==chars[j]){
//                    j++;
//                    count++;
//                }
//
//            }
//            temp+= String.valueOf(setChars[i])+count;
//        }
//        System.out.println(temp);
//
//
//    }

    public List getSet(String str){
        List list=new ArrayList<String>();
        Set set=new HashSet<String>();
        char[] chars = str.toCharArray();
        for (int i = 0; i <chars.length; i++) {
            set.add(chars[i]);
        }
        list.addAll(set);
        return list;

    }

    @Test
    public void test8(){

    }
















}
