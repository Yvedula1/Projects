package com.example.frequentflier;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Typeface;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class MainActivity3 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);
        TextView textView8=findViewById(R.id.textView8);
        String t=getIntent().getStringExtra("pid");
        RequestQueue queue1= Volley.newRequestQueue(this);
        String url3="http://10.0.2.2:8080/frequentflier/Flights.jsp?pid="+t;



        StringRequest request3=new StringRequest(Request.Method.GET, url3, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                String result2 = s.trim();
                String[] rows = result2.split("#");

                String output =String.format (" FlightId    FlightMiles  FlightDestination \n");
                output += ("-------------------------------------------\n");

                for (String row : rows) {
                    String[] columns = row.split(",");
                    String FlightId = columns[0];
                    String FlightMiles = columns[1];
                    String FlightDestination = columns[2];
                    output += String.format(" %-10s  %-11s  %-16s \n", FlightId, FlightMiles, FlightDestination);

                }
                output += ("-------------------------------------------\n");

                textView8.setTypeface(Typeface.MONOSPACE);
                textView8.setText(output.toString());
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("MainActivity3", "Error retrieving data from server: " + error.getMessage());
            }
        });
        queue1.add(request3);
    }
}