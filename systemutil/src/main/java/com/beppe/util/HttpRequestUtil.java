package com.beppe.util;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HttpRequestUtil {


	private static final Logger LOGGER = LoggerFactory.getLogger(HttpRequestUtil.class);

	private static final String NGINX_IP_HEADER = "X-Real-IP";
	private static final String NGINX_URL_HEADER = "X-Real-Url";
	private static final String X_FORWARDED_FOR = "X-Forwarded-For";

	public static HttpServletRequest getRequest() {
		if (RequestContextHolder.getRequestAttributes() == null) {
			return null;
		}
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}

	public static String getApplicationContextPath() {
		return getRequest().getServletContext().getRealPath("/");
	}

	public static String getParameter(String key) {
		return getRequest().getParameter(key);
	}

	/**
	 * 从request中抽取客户端ip(兼容nginx转发模式)
	 * @see #NGINX_IP_HEADER
	 * @return
	 */
	public static String getRequstIp()
	{
		String ip = null;
		String xff = getRequest().getHeader(X_FORWARDED_FOR);
		if(StringUtils.isNotBlank(xff))
		{
			//"120.76.97.135, 120.27.173.13"
			String[] ips = StringUtils.split(xff,",");
			if(ips != null && ips.length >0)
			{
				for(String str: ips)
				{
					str = StringUtil.replaceBlank(str);
					if(StringUtil.isIp(str))
					{
						ip=str;
						return ip;
					}
				}
			}

		}
		ip = getRequest().getHeader(NGINX_IP_HEADER);
		if(StringUtils.isBlank(ip))
		{
			ip = getRequest().getRemoteAddr();
		}
		return ip;
	}


	/**
	 * 从request中抽取当前url(兼容nginx转发模式)
	 *
	 * @return
	 * @see #NGINX_URL_HEADER
	 */
	public static String getRemoteUrl() {
		HttpServletRequest request = getRequest();
		if (checkParamNull(request)) {
			return null;
		}
		String url = request.getHeader(NGINX_URL_HEADER);
		if (StringUtils.isEmpty(url)) {
			return request.getRequestURL().toString();
		} else {
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("NGINX_URL_HEADER:" + url);
			}
			return url;
		}
	}


	private static boolean checkParamNull(Object... params) {
		for (Object param : params) {
			if (null == param) {
				LOGGER.error("Invalid Parameter.");
				return true;
			}
		}
		return false;
	}




	/**
	 * 设置cookie。
	 *
	 * @param response 响应对象
	 * @param name     名称
	 * @param value    值
	 */
	public static void setCookie(
            HttpServletResponse response, String name, String value) {
		setCookie(response, name, value, Integer.MAX_VALUE);
	}

	/**
	 * 设置cookie。
	 *
	 * @param response 响应对象
	 * @param name     名称
	 * @param value    值
	 * @param maxAge   cookie 有效时长
	 */
	public static void setCookie(
            HttpServletResponse response, String name, String value, int maxAge) {
		Cookie cookie = new Cookie(name, value == null ? "" : value);
		cookie.setMaxAge(maxAge);
		cookie.setPath("/");
		response.addCookie(cookie);
	}

	/**
	 * 根据名称获取cookie对象。
	 *
	 * @param request 请求对象
	 * @param name    cookie 名称
	 * @return cookie对象，没有时返回null。
	 */
	public static Cookie getCookie(HttpServletRequest request, String name) {
		Cookie cookies[] = request.getCookies();
		if (cookies == null || name == null || name.length() == 0) {
			return null;
		}
		for (int i = 0; i < cookies.length; i++) {
			if (name.equals(cookies[i].getName())) {
				return cookies[i];
			}
		}
		return null;
	}


}
