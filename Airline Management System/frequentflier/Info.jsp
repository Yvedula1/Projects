<%@page import="java.sql.*" %>

<%

String pid = (request.getParameter("pid"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
//Integer passid=Integer.parseInt(pid);
String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
Statement stmt=conn.createStatement();
//stmt.setInt(1,passid);
String q="Select p.pname,pt.total_points from passengers p join point_accounts pt on p.passid=pt.passid WHERE pt.passid=" + pid ;
ResultSet rs=stmt.executeQuery(q) ;

String output = "   ";

while (rs.next()) {
    output += rs.getString(1) + "," +rs.getObject(2)+ "#";
}
    
conn.close();
out.print(output);

%>
