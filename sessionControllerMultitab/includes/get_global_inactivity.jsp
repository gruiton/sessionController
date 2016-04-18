<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Date" %>
<%
String current_time = (request.getParameter("currentTime") != null) ? request.getParameter("currentTime") : "";
String last_activity_time = (session.getAttribute("lastActivity") != null) ? (String) session.getAttribute("lastActivity") : "";

SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");

Date currentTime = format.parse(current_time);
Date lastActivityTime = format.parse(last_activity_time);

int diff = (int) ((currentTime.getTime() - lastActivityTime.getTime()) / 1000); //in seconds
%><%=diff%>
