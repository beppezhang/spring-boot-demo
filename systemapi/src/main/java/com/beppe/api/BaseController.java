package com.beppe.api;

import com.alibaba.fastjson.JSON;
import com.beppe.exception.ErrorCodes;
import com.beppe.model.ResultModel;
import com.beppe.exception.CommonException;
import com.beppe.util.HttpRequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangshangliang on 2017/12/28.
 * 目标：将代码中的异常抛出
 */
@Controller
public class BaseController {

    private final Logger logger= LoggerFactory.getLogger(BaseController.class);

    @Resource
    protected MessageSource messageSource;
    @Autowired
    protected HttpServletRequest request;


    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    public ResultModel<?> checkException(Exception ex, HttpServletRequest request) {
        if (ex instanceof CommonException) {
            logger.error("controller common error uri:{},params:{},ip:{},userAgent:{},errorCode:{},errorMsg:{}", request.getRequestURI(),
                    JSON.toJSONString(request.getParameterMap()), HttpRequestUtil.getRequstIp(), request.getHeader("User-Agent"), ((CommonException) ex).getErrorCode(),
                    ex.getMessage());
            return toResultModel(((CommonException) ex).getErrorCode(), ex.getMessage());
        } else {
            ex.printStackTrace();
            logger.error("controller error uri:{},params:{},ip:{},userAgent:{}", request.getRequestURI(),
                    JSON.toJSONString(request.getParameterMap()), HttpRequestUtil.getRequstIp(), request.getHeader("User-Agent"), ex);
            //return toResultModel(((CommonException) ex).getErrorCode(), ex.getMessage());
            return toResultModel(ErrorCodes.SYSTEM_ERROR, ErrorCodes.SYSTEM_ERROR_MESSAGE);
        }
    }

    /**
     * 获取返回结果
     *
     * @param code
     * @return
     */
    protected ResultModel toResultModel(String code, String msg) {
        ResultModel resultModel = new ResultModel();
        resultModel.setSuccess(false);
        resultModel.setErrorCode(code);
        resultModel.setErrorInfo(msg);
        return resultModel;
    }
}
