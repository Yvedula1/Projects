package com.example.frequentflier;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class MainActivity2 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        TextView textView4=findViewById(R.id.textView4);
        TextView textView5=findViewById(R.id.textView5);
        ImageView imageView=findViewById(R.id.imageView);
        Button button2=findViewById(R.id.button2);
        Button button3=findViewById(R.id.button3);
        Button button4=findViewById(R.id.button4);
        Button button5=findViewById(R.id.button5);
        Button button6=findViewById(R.id.button6);

        String y=getIntent().getStringExtra("pid");
        RequestQueue queue= Volley.newRequestQueue(this);
        String url1="http://10.0.2.2:8080/frequentflier/Info.jsp?pid="+y;
        StringRequest reque1=new StringRequest(Request.Method.GET, url1, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                String res1=s.trim().replace("#","");
                String[] a=res1.split(",");

                String value = a[0];
                String y=a[1];
                //Toast.makeText(MainActivity2.this, value, Toast.LENGTH_LONG).show();
                textView4.setText(value);
                textView5.setText(y);

            }
        },null);
        queue.add(reque1);
        String url2="http://10.0.2.2:8080/frequentflier/images/"+y+".jpg";
        ImageRequest request2= new ImageRequest(url2, new Response.Listener<Bitmap>() {
            @Override
            public void onResponse(Bitmap bitmap) {
                imageView.setImageBitmap(bitmap);
            }
        },0,0,null,null);

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent1 = new Intent(MainActivity2.this, MainActivity3.class);
                intent1.putExtra("pid", y);
                startActivity(intent1);
            }
        });
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent2=new Intent(MainActivity2.this, MainActivity4.class);
                intent2.putExtra("pid", y);
                startActivity(intent2);
            }
        });
        button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent3=new Intent(MainActivity2.this, MainActivity5.class);
                intent3.putExtra("pid", y);
                startActivity(intent3);
            }
        });

        button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent4=new Intent(MainActivity2.this, MainActivity6.class);
                intent4.putExtra("pid", y);
                startActivity(intent4);
            }
        });
        button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity2.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });
        queue.add(request2);
    }
}