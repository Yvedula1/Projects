<%@page import="java.sql.*" %>

<%

String pid = (request.getParameter("flightid"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
Integer flight_id=Integer.parseInt(pid);
String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
PreparedStatement stmt=conn.prepareStatement("Select f.dept_datetime,f.arrival_datetime,f.flight_miles, t.trip_id, t.trip_miles from flights f join flights_trips p on f.flight_id=p.flight_id join trips t on t.trip_id=p.trip_id WHERE f.flight_id=?");
stmt.setInt(1,flight_id);
ResultSet rs=stmt.executeQuery() ;

String output = "   ";

while (rs.next()) {
    output += rs.getTimestamp("dept_datetime") + "," +rs.getTimestamp("arrival_datetime")+ "," +rs.getObject("flight_miles")+ "," +rs.getObject("trip_id")+ "," +rs.getObject("trip_miles")+"#";
}
    
    
conn.close();
out.print(output);

%>
