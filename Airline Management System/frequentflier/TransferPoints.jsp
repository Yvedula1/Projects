<%@page import="java.sql.*" %>

<%

String spid = (request.getParameter("spid"));
String dpid = (request.getParameter("dpid"));
String npoints = (request.getParameter("npoints"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());

String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
Statement stmt=conn.createStatement();
String q1="Update Point_accounts set total_points=total_points-" + npoints + " where passid=" + spid + "";
String q2="update point_accounts set total_points=total_points+" + npoints + " where passid=" + dpid + "";
ResultSet rs1=stmt.executeQuery(q1);
ResultSet rs2=stmt.executeQuery(q2);

out.print("Points transferred successfully!");

conn.close();

%>
