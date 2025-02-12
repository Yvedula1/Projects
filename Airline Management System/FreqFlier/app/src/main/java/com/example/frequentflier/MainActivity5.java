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

public class MainActivity5 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main5);
        Spinner spinner2=findViewById(R.id.spinner2);
        TextView textView19=findViewById(R.id.textView19);
        TextView textView21=findViewById(R.id.textView21);
        TextView textView22=findViewById(R.id.textView22);
        String f=getIntent().getStringExtra("pid");
        RequestQueue queue3= Volley.newRequestQueue(this);
        String url5="http://10.0.2.2:8080/frequentflier/AwardIds.jsp?pid="+f;
        ArrayList<String> list1=new ArrayList<String>();
        StringRequest request5=new StringRequest(Request.Method.GET, url5, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                String result4=s.trim();

                String[] rows = result4.split("#");
                for (String row : rows) {
                    String[] columns = row.split(",");
                    String AwardId = columns[0];
                    list1.add(AwardId);

                }
                ArrayAdapter<String> adapter=new ArrayAdapter<String>(MainActivity5.this, androidx.appcompat.R.layout.support_simple_spinner_dropdown_item,list1);
                spinner2.setAdapter(adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {

            }
        });
        queue3.add(request5);
        spinner2.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String item=parent.getSelectedItem().toString();

                String url6="http://10.0.2.2:8080/frequentflier/RedemptionDetails.jsp?awardid="+item+"&pid="+f;
                StringRequest request6=new StringRequest(Request.Method.GET, url6, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String s) {
                        String result5=s.trim().replace("#", "");
                        String[] d=result5.split(",");
                        //Toast.makeText(MainActivity5.this,d[0],Toast.LENGTH_LONG).show();
                        textView19.setText(d[0]);
                        textView21.setText(d[1]+" Points");
                        String output="  Redemption Date          EC Name \n";
                        output+="----------------------------------\n";
                        output+= String.format(" %-9s      %-7s\n", d[2], d[3]);
                        output+="----------------------------------\n";
                        textView22.setTypeface(Typeface.MONOSPACE);
                        textView22.setText(output.toString());

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError volleyError) {

                    }
                });
                queue3.add(request6);

            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
}