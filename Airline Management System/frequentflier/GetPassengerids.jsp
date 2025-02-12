<%@page import="java.sql.*" %>

<%

String pid = (request.getParameter("pid"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
Integer passid=Integer.parseInt(pid);
String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
PreparedStatement stmt=conn.prepareStatement("Select passid from passengers where passid !=?");
stmt.setInt(1,passid);
ResultSet rs=stmt.executeQuery() ;

String output = "   ";

while (rs.next()) {
    output += rs.getObject(1)+"#";
}
    
conn.close();
out.print(output);

%>
