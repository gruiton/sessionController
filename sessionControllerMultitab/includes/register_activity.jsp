<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Date" %>
<%
String last_activity = (request.getParameter("lastActivity") != null) ? request.getParameter("lastActivity") : "";
String last_activity_session = (session.getAttribute("lastActivity") != null) ? (String) session.getAttribute("lastActivity") : "0:0:0";

SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
Date lastActivity = format.parse(last_activity);
Date lastActivitySession = format.parse(last_activity_session);

if(lastActivitySession.before(lastActivity)) session.setAttribute("lastActivity", last_activity);
%><%= (String) session.getAttribute("lastActivity")%>