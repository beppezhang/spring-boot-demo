package com.beppe.api;


import com.beppe.exception.CommonException;
import com.beppe.model.ResultModel;

import com.beppe.rabbit.Send;
import com.beppe.service.CustomerServiceImpl;
import com.beppe.util.RedisUtil;
import com.dubbo.iservice.DubboService;
import com.dubbo.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SampleController {

    private Logger logger = LoggerFactory.getLogger(SampleController.class);

    @Autowired
    private RedisTemplate redisTemplate;


    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private DubboService dubboService;

    @Autowired
    private RedisUtil redisUtil;



//   @Autowired
//   private Send send;


//    @RequestMapping("/rabbitmq")
//    public ResultModel rabbitmq() {
////        cityService.getCountry();
//        ResultModel resultModel = new ResultModel();
//       send.sendMsg("this is the rabbitmq test!!");
//
//        return resultModel;
//
//    }


    @RequestMapping("/cache")
    public ResultModel cache() {
        ResultModel resultModel = new ResultModel();
//        redisTemplate.opsForValue().set("name1","beppe1");
//        String name1 = redisUtil.getStringValue("name1");
//        System.out.println(name1);
//        resultModel.setData(str);

//        list
//        List list=new ArrayList<String>();
//        list.add("beppe1");
//        list.add("beppe2");
//        list.add("beppe3");
//        list.add("beppe3");
//        redisTemplate.opsForList().leftPush("list1",list);
//
//        List list1 = (List)redisTemplate.opsForList().rightPop("list1");
//        System.out.println(list1);
//        redisTemplate.opsForList().leftPush("list2","beppe1");
//        redisTemplate.opsForList().leftPush("list2","beppe2");
//        redisTemplate.opsForList().leftPush("list2","beppe3");
////        String list2 = (String)redisTemplate.opsForList().leftPop("list2");
//        List list2 = redisTemplate.opsForList().range("list2", 0, -1);
//        System.out.println(list2);
//        set

//        redisTemplate.opsForSet().add("set1","beppe1");
//        redisTemplate.opsForSet().add("set1","beppe2");
//        redisTemplate.opsForSet().add("set1","beppe3");
//        redisTemplate.opsForSet().add("set1","beppe3");
//        Set set1 = redisTemplate.opsForSet().members("set1");
//        String set11 = (String)redisTemplate.opsForSet().pop("set1");
//        System.out.println(set1);
//        System.out.println(set11);

//        Hash
//        redisTemplate.opsForHash().put("hash1","name1","beppe1");
//        redisTemplate.opsForHash().put("hash1","name2","beppe2");
//        String name1=(String)redisTemplate.opsForHash().get("hash1","name1");
//        Map<String,String> hash1 = redisTemplate.opsForHash().entries("hash1");
//        for (Map.Entry<String,String> entry:hash1.entrySet()) {
//            System.out.println(entry.getKey()+":"+entry.getValue());
//        }
//        Iterator iterator = hash1.entrySet().iterator();
//        while(iterator.hasNext()){
//            Map.Entry entry  = (Map.Entry)iterator.next();
//            System.out.println(entry.getKey()+":"+entry.getValue());
//        }
//        System.out.println(hash1);

//        incr
//        redisTemplate.opsForValue().set("stock",10);
//        RedisAtomicLong counter = new RedisAtomicLong("stock", redisTemplate.getConnectionFactory());
//        long l = counter.addAndGet(2);
//        System.out.println(l);

//        redis lock
        return resultModel;

    }

    //    目的：保证接口的幂等性
    @RequestMapping("/order")
    public ResultModel order() throws CommonException {
        int i = customerService.order("15618962870");
        ResultModel resultModel = new ResultModel();
        System.out.println(i);
        return resultModel;

    }

    //    token 机制防止重复提交
    @RequestMapping("/repeatSubmit")
    public ResultModel repeatSubmit(String token) throws CommonException {
        int order = customerService.order(token);
        ResultModel resultModel = new ResultModel();
        System.out.println(order);
        return resultModel;

    }

    //    在提交之前先申请token
    @RequestMapping("/applyToken")
    public ResultModel applyToken() {
        String mobile="15618962870";
        String token = customerService.getToken(mobile);
        ResultModel resultModel = new ResultModel();
        resultModel.setData(token);
        System.out.println(token);
        return resultModel;

    }

    //    dubbo服务调用 TODO 为了测试暂时被注释了
    @RequestMapping("/customer")
    public ResultModel customer() {
        ResultModel resultModel = new ResultModel();
//        customerService.getCustomer("36e87f55-5056-4d6a-bdf5-895c1004bae9");
        Customer customer = dubboService.selectCustomer("4ee28088-0568-4968-a222-980ae1d2715e");
        System.out.println(customer.getName());
        return resultModel;

    }


}
