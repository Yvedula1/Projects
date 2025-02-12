<%@page import="java.sql.*" %>

<%
String aid = (request.getParameter("awardid"));
String pid = (request.getParameter("pid"));
DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
Integer award_id=Integer.parseInt(aid);
Integer passid=Integer.parseInt(pid);
String url="jdbc:oracle:thin:@artemis.vsnet.gmu.edu:1521/vse18c.vsnet.gmu.edu";
Connection conn=DriverManager.getConnection(url,"yvedula", "aglyphoa");
PreparedStatement stmt=conn.prepareStatement("SELECT a.a_description, a.points_required, r.redemption_date, e.center_name FROM Awards a JOIN Redemption_History r ON a.award_id = r.award_id JOIN ExchgCenters e ON r.center_id = e.center_id WHERE a.award_id = ? AND r.passid = ?");
stmt.setInt(1,award_id);
stmt.setInt(2, passid);
ResultSet rs=stmt.executeQuery() ;

String output = "   ";

while (rs.next()) {
    output += rs.getString("a_description")+ "," +rs.getObject("points_required")+ "," +rs.getTimestamp("redemption_date")+ "," +rs.getString("center_name")+"#";
}
    
    
conn.close();
out.print(output);

%>


