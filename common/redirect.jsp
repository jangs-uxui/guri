<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String ipAddr = request.getRemoteAddr();
    //System.out.println("landing ip : " + ipAddr);
    if(!"175.212.21.90".equals(ipAddr) && !"211.114.22.142".equals(ipAddr) && !"0:0:0:0:0:0:0:1".equals(ipAddr)  && !"27.101.112.10".equals(ipAddr)&& !"192.168.200.11".equals(ipAddr)&& !"192.168.200.22".equals(ipAddr)&& !"175.212.21.90".equals(ipAddr)&& !"116.121.87.183".equals(ipAddr)) {
    if("0:0:0:0:0:0:0:1".equals(ipAddr)) {
        //pageContext.forward("/landing.jsp");
%>
        <script nonce="NEOCMSSCRIPT">
                location.href = "/landing/main_landing.html";
        </script>
<%
    }
%>

