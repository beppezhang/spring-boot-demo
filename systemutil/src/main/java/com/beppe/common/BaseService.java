package com.beppe.common;



import com.beppe.exception.CommonException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;

import javax.annotation.Resource;
import java.util.Locale;


/**
 * 基础service类
 *
 * @author hcf
 * @version V1.0
 */
public abstract class BaseService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	private MessageSource messageSource;


	/**
	 * 抛出异常
	 *
	 * @param code
	 * @param message
	 * @throws
	 */
	protected void thrown(String code, String message) throws CommonException {
		throw new CommonException(code, message);
	}

	/**
	 * 抛出异常
	 *
	 * @param code
	 * @param args
	 * @throws CommonException
	 */
	protected void thrown(String code, String... args) throws CommonException {
		throw new CommonException(code, messageSource.getMessage(code, args, Locale.SIMPLIFIED_CHINESE));
	}

	/**
	 * 抛出异常
	 *
	 * @param code
	 * @param cause
	 * @param args
	 * @throws CommonException
	 */
	protected void thrown(String code, Throwable cause, String... args) throws CommonException {
		throw new CommonException(code, messageSource.getMessage(code, args, Locale.SIMPLIFIED_CHINESE), cause);
	}

	protected String getMessage(String code, String... args) {
		return messageSource.getMessage(code, args, Locale.SIMPLIFIED_CHINESE);
	}


}
