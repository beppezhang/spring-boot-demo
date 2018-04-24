package com.beppe.util;

import org.apache.commons.lang3.StringUtils;
import sun.misc.BASE64Decoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author fei
 * @version V1.0
 */
public class StringUtil {
    public static final String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？ 　]";

    public static final String ID_CARD_REGEX = "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}X$)";

    public static final String IP_REGEX = "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\."
            +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
            +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
            +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$";

    public static final String[] ads={"href","<a"};
    /**
     * 验证手机号码
     *
     * @param mobile
     * @return
     */
    public static boolean isMobileNum(String mobile) {
        if (StringUtils.isBlank(mobile)) {
            return false;
        }
        String pattern = "^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\\d{8}$";
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(mobile);
        return m.matches();
    }
    
    
    public static String maskUserName(String userName) {
        userName="*"+userName.substring(1);
        return userName;
        
    }
    
    public static boolean isIdCard(String idCard) {
        if (StringUtils.isBlank(idCard)) {
            return false;
        }
        Pattern p = Pattern.compile(ID_CARD_REGEX);
        Matcher m = p.matcher(idCard);
        return m.matches();

    }


    public static boolean isIp(String ip) {
        if (StringUtils.isBlank(ip)) {
            return false;
        }
        Pattern p = Pattern.compile(IP_REGEX);
        Matcher m = p.matcher(ip);
        return m.matches();

    }

    public static String hashPassword(String mobile, String password) throws Exception {
        if (StringUtils.isBlank(mobile) || StringUtils.isBlank(password)) {
            throw new NullPointerException();
        }
        return md5(mobile + "+" + password);
    }

    public static String md5(String text) throws Exception {
        return md5(text.getBytes("UTF-8"));
    }

    public static String md5(byte[] source) throws Exception {
        int bufferSize = 4096;
        byte[] buffer = new byte[4096];

        MessageDigest md5 = MessageDigest.getInstance("MD5");

        int remain = source.length;

        while (remain > 0) {
            int len = (remain > bufferSize) ? bufferSize : remain;
            System.arraycopy(source, source.length - remain, buffer, 0, len);
            remain = remain - len;

            md5.update(buffer, 0, len);
        }

        return byte2Hex(md5.digest());
    }

    public static String byte2Hex(byte[] bytes) throws Exception {
        final String HEX = "0123456789abcdef";

        String result = "";
        for (int i = 0; i < bytes.length; i++) {
            result += HEX.charAt(bytes[i] >> 4 & 0x0F);
            result += HEX.charAt(bytes[i] & 0x0F);
        }

        return new String(result);
    }

    public static String getMobileMask(String mobile) {
        return mobile.substring(0, 3) + "****" + mobile.substring(7, 11);
    }

    public static boolean checkHasSpecialSymbol(String str) {
        if (str == null) {
            return false;
        }
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(str);
        return m.find();
    }

    public static String getUUID32() {
        return StringUtils.remove(getUUID(), "-");
    }

    public static String getUUID() {
        return UUID.randomUUID().toString();
    }

    public static String aesEncrypt(String content, String key, String iv) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);
            byte[] encrypted = cipher.doFinal(content.getBytes());

            return new sun.misc.BASE64Encoder().encode(encrypted);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String aesDecrypt(String content, String key, String iv) {
        try {
            byte[] encrypted1 = new BASE64Decoder().decodeBuffer(content);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original);
            return originalString;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getStringNoBlank(String str) {
        if (str != null && !"".equals(str)) {
            Pattern p = Pattern.compile("\t|\r|\n");
            Matcher m = p.matcher(str);
            String strNoBlank = m.replaceAll("");
            return strNoBlank;
        } else {
            return str;
        }
    }

    public static String replaceBlank(String str) {
        String dest = "";
        if (str!=null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }


    /**
     * 使用java正则表达式去掉多余的.与0
     *
     * @param s
     * @return
     */
    public static String subZeroAndDot(String s) {
        if (s.indexOf(".") > 0) {
            s = s.replaceAll("0+?$", "");//去掉多余的0
            s = s.replaceAll("[.]$", "");//如最后一位是.则去掉
        }
        return s;
    }
    
    public static String decodeUnicode(String theString) {
    	System.out.println(theString);
		if(theString==null||"".equals(theString))
			return null;
		char aChar;
		int len = theString.length();
		StringBuilder outBuilder = new StringBuilder(len);
		for (int x = 0; x < len;) {
			aChar = theString.charAt(x++);
			if (aChar == '\\') {
				aChar = theString.charAt(x++);
				if (aChar == 'u') {
					int value = 0;
					for (int i = 0; i < 4; i++) {
						aChar = theString.charAt(x++);
						switch (aChar) {
						case '0':
						case '1':
						case '2':
						case '3':
						case '4':
						case '5':
						case '6':
						case '7':
						case '8':
						case '9':
							value = (value << 4) + aChar - '0';
							break;
						case 'a':
						case 'b':
						case 'c':
						case 'd':
						case 'e':
						case 'f':
							value = (value << 4) + 10 + aChar - 'a';
							break;
						case 'A':
						case 'B':
						case 'C':
						case 'D':
						case 'E':
						case 'F':
							value = (value << 4) + 10 + aChar - 'A';
							break;
						default:
							throw new IllegalArgumentException(
									"Malformed   \\uxxxx   encoding.");
						}
					}
					outBuilder.append((char) value);
				} else {
					if (aChar == 't')
						aChar = '\t';
					else if (aChar == 'r')
						aChar = '\r';
					else if (aChar == 'n')
						aChar = '\n';
					else if (aChar == 'f')
						aChar = '\f';
					outBuilder.append(aChar);
				}
			} else
				outBuilder.append(aChar);
		}
		return outBuilder.toString();

	}


    // 判别是否包含Emoji表情
    public static boolean containsEmoji(String str) {
        int len = str.length();
        for (int i = 0; i < len; i++) {
            if (isEmojiCharacter(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    private static boolean isEmojiCharacter(char codePoint) {
        return !((codePoint == 0x0) ||
                (codePoint == 0x9) ||
                (codePoint == 0xA) ||
                (codePoint == 0xD) ||
                ((codePoint >= 0x20) && (codePoint <= 0xD7FF)) ||
                ((codePoint >= 0xE000) && (codePoint <= 0xFFFD)) ||
                ((codePoint >= 0x10000) && (codePoint <= 0x10FFFF)));
    }

	public static boolean containsEmoji2(String source) {
		if (source != null) {
			Pattern emoji = Pattern.compile("[\\u2190-\\u21FF]|[\\u2600-\\u26FF]|[\\u2700-\\u27BF]|[\\u3000-\\u303F]|[\\ue000-\\uefff]", Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE);
			Matcher emojiMatcher = emoji.matcher(source);
			if (emojiMatcher.find()) {
				System.out.println(emojiMatcher.group());
				return true;
			}
			return false;
		}
		return false;
	}


	public static String objToString(Object obj){
        return obj == null ?"":obj.toString();
    }

    public static String getAccidByUserId(Long userId){
        return "future_"+String.valueOf(userId);
    }
//    public static String getAccidByCurrTime(){
//        return "future_"+System.currentTimeMillis() + RandomUtil.generateInt(3);
//    }
    public static String getAccidByMobile(String mobile){
        return "future_"+mobile;
    }

    public static int getTimeStrToNum(String timeStr){
        try {
            timeStr = timeStr.replace(":","").replace(" ","");
            if(timeStr.indexOf("0") == 1){
                timeStr = timeStr.substring(1);
            }

            return Integer.parseInt(timeStr);

        }catch (Exception e){}

        return 0;
    }

    public static String getVersionFromUseragent(String str) {
        try {
            int startindex = str.indexOf("/");
            int endindex = str.indexOf(" ");
            System.out.println(startindex + "||" +endindex);
            String version = str.substring(startindex+2, endindex);
            System.out.println(version);
            return version;
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static String getTypeFromUseragent(String str) {
        try {
            int startindex = str.indexOf("(");
            int endindex = str.indexOf(";");
            String version = str.substring(startindex+1, endindex);
            return version;
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static boolean isAd(String content){
        boolean flag=false;
        for (String ad : ads) {
            if(content.contains(ad)){
                return true;
            }
        }
        return flag;
    }

    public static void main(String[] args) {
        System.out.println(isAd("<1,rr>"));
    }


}
