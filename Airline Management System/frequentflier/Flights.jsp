<%@page import="java.sql.*" %>

<%

String pid = (request.getParameter("pid"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
Integer passid=Integer.parseInt(pid);
String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
PreparedStatement stmt=conn.prepareStatement("Select flight_id, flight_miles, destination from flights where passid=?");
stmt.setInt(1,passid);
ResultSet rs=stmt.executeQuery() ;

String output = "   ";

while (rs.next()) {
    output += rs.getString("flight_id") + "," +rs.getObject("flight_miles")+","+rs.getString("destination")+"#";
}
    
conn.close();
out.print(output);

%>
