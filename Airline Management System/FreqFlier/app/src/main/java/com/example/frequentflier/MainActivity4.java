package com.example.frequentflier;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Typeface;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;

public class MainActivity4 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);
        Spinner spinner=findViewById(R.id.spinner);
        TextView textView11=findViewById(R.id.textView11);
        TextView textView13=findViewById(R.id.textView13);
        TextView textView15=findViewById(R.id.textView15);
        TextView textView16=findViewById(R.id.textView16);
        String r=getIntent().getStringExtra("pid");
        RequestQueue queue2= Volley.newRequestQueue(this);
        String url4="http://10.0.2.2:8080/frequentflier/Flights.jsp?pid="+r;
        ArrayList<String> list=new ArrayList<String>();
        StringRequest request4=new StringRequest(Request.Method.GET, url4, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                String result3=s.trim();

                String[] rows = result3.split("#");
                for (String row : rows) {
                    String[] columns = row.split(",");
                    String FlightId = columns[0];
                    list.add(FlightId);
                }
                ArrayAdapter<String> adapter=new ArrayAdapter<String>(MainActivity4.this, androidx.appcompat.R.layout.support_simple_spinner_dropdown_item,list);
                spinner.setAdapter(adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {

            }
        });
        queue2.add(request4);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String item=parent.getSelectedItem().toString();

                String url5="http://10.0.2.2:8080/frequentflier/FlightDetails.jsp?flightid="+item;
                StringRequest request5=new StringRequest(Request.Method.GET, url5, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String s) {
                        String result4=s.trim().replace("#", "");
                        String[] d=result4.split(",");
                        textView11.setText("Departure: "+d[0]);
                        textView13.setText("Arrival: "+d[1]);
                        textView15.setText("Miles: "+d[2]);

                        String output = String.format("  TripId     TripMiles     \n");
                        output += "----------------------\n";
                        output += String.format(" %-10s %-11s\n", d[3], d[4]);
                        textView16.setTypeface(Typeface.MONOSPACE);
                        textView16.setText(output.toString());


                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError volleyError) {

                    }
                });
                queue2.add(request5);

            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
}