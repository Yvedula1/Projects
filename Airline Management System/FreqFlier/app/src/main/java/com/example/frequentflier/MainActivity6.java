package com.example.frequentflier;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;

public class MainActivity6 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main6);
        Spinner spinner3=findViewById(R.id.spinner3);
        EditText editText3=findViewById(R.id.editText3);
        Button button7=findViewById(R.id.button7);
        String g=getIntent().getStringExtra("pid");
        RequestQueue queue3= Volley.newRequestQueue(this);

        String url5="http://10.0.2.2:8080/frequentflier/GetPassengerids.jsp?pid="+g;
        ArrayList<String> list2=new ArrayList<String>();
        StringRequest request6=new StringRequest(Request.Method.GET, url5, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                String result4=s.trim();

                String[] rows = result4.split("#");
                for (String row : rows) {
                    String[] columns = row.split(",");
                    String AwardId = columns[0];
                    list2.add(AwardId);

                }
                ArrayAdapter<String> adapter=new ArrayAdapter<String>(MainActivity6.this, androidx.appcompat.R.layout.support_simple_spinner_dropdown_item,list2);
                spinner3.setAdapter(adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {

            }
        });
        queue3.add(request6);
        spinner3.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String item=parent.getSelectedItem().toString();
                button7.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {

                        String points=editText3.getText().toString();
                        if (points == null || points.trim().length() == 0) {
                            // The points string is null, empty, or contains only whitespace
                            Toast.makeText(MainActivity6.this, "Please enter points to transfer", Toast.LENGTH_LONG).show();
                        }
                        else {
                            String url6 = "http://10.0.2.2:8080/frequentflier/TransferPoints.jsp?spid=" + g + "&dpid=" + item + "&npoints=" + points;
                            StringRequest request7 = new StringRequest(Request.Method.GET, url6, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String s) {
                                    Toast.makeText(MainActivity6.this, points + " points transferred successfully", Toast.LENGTH_LONG).show();
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError volleyError) {

                                }
                            });
                            queue3.add(request7);
                        }
                    }
                });

            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
}