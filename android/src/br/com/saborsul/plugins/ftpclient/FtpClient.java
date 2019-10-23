/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */
package br.com.saborsul.plugins.ftpclient;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Environment;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.StringTokenizer;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;
import java.io.File;
import java.io.InputStream;
import org.apache.cordova.*;

public class FtpClient extends CordovaPlugin {

    private static final String LOG_TAG = "FtpClient";

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action The action to execute.
     * @param args JSONArry of arguments for the plugin.
     * @param callbackId The callback id used when calling back into JavaScript.
     * @return A PluginResult object with a status and message.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        PluginResult.Status status = PluginResult.Status.OK;
        JSONArray result = new JSONArray();
        try {
            String filename = args.getString(0);
            URL url = new URL(args.getString(1));
            String aux = null;
            if (action.equals("get")) {
                get(filename, url);
            } else if (action.equals("put")) {
                put(filename, url);
            }
//            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, aux));
//                callbackContext.success(aux);
//                return true;
            callbackContext.sendPluginResult(new PluginResult(status, result));
           //Toast.makeText(cordova.getActivity().getApplicationContext(), "Debugueichon", Toast.LENGTH_SHORT).show();
            //showAlertDialog(cordova.getActivity().getApplicationContext(), "Debugueichon", "linha 61", Boolean.TRUE);
            //return true;
        } catch (JSONException e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION, "erro json"));
            //showAlertDialog(cordova.getActivity().getApplicationContext(), "Debugueichon", "linha 66", Boolean.TRUE);
        } catch (MalformedURLException e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.MALFORMED_URL_EXCEPTION, "erro url"));
            //showAlertDialog(cordova.getActivity().getApplicationContext(), "Debugueichon", "linha 68", Boolean.TRUE);
        } catch (IOException e){
            
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.IO_EXCEPTION, "erro IO"));
            
        
            //showAlertDialog(cordova.getActivity().getApplicationContext(), "Debugueichon", "linha 71", Boolean.TRUE);
        }
        return true;
    }

      public void showAlertDialog(Context context, String title, String message, Boolean status) {
        AlertDialog alertDialog = new AlertDialog.Builder(context).create();

        // Setting Dialog Title
        alertDialog.setTitle(title);

        // Setting Dialog Message
        alertDialog.setMessage(message);

        // Setting alert dialog icon
        //alertDialog.setIcon((status) ? R.drawable.ic_action_conditions : R.drawable.ic_action_help);

        // Setting OK Button
        alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
            }
        });

        // Showing Alert Message
        alertDialog.show();
    }
        
    /**
     * Uploads a file to a ftp server.
     *
     * @param filename the name of the local file to send to the server
     * @param url the url of the server
     * @throws IOException
     */
    private void put(String filename, URL url) throws IOException {
        FTPClient f = setup(url);

        BufferedInputStream buffIn = null;
        
        FileInputStream auxStream = new FileInputStream(Environment.getExternalStorageDirectory()+"/Download/"+filename);
        
        buffIn = new BufferedInputStream(auxStream);
        f.storeFile(extractFileName(url), buffIn);
        buffIn.close();

        teardown(f);
    }

    /**
     * Downloads a file from a ftp server.
     *
     * @param filename the name to store the file locally
     * @param url the url of the server
     * @throws IOException
     */
    private void get(String filename, URL url) throws IOException {
        FTPClient f = setup(url);
        BufferedOutputStream buffOut = null;
//        //////File file = new File(filename);
        FileOutputStream auxStream = new FileOutputStream(Environment.getExternalStorageDirectory()+"/Download/"+filename);
//        /////return "test";
        buffOut = new BufferedOutputStream(auxStream);

        f.retrieveFile(extractFileName(url), buffOut);
        buffOut.flush();
        buffOut.close();
        //Toast.makeText(cordova.getActivity().getApplicationContext(), "Debugueichon", Toast.LENGTH_SHORT).show();
        teardown(f);
      
    }
    
// 
//   /**
//     * Downloads a file from a ftp server.
//     *
//     * @param filename the name to store the file locally
//     * @param url the url of the server
//     * @throws IOException
//     */
//    private void get(String filename, URL url) throws IOException {
//        FTPClient f = setup(url);
//        BufferedOutputStream buffOut = null;
////        //////File file = new File(filename);
//        FileOutputStream auxStream = new FileOutputStream(Environment.getExternalStorageDirectory()+"/Download/"+filename);
//        
//        
//        
//        
//        buffOut = new BufferedOutputStream(auxStream);
//        
//        InputStream inputStream = f.retrieveFileStream(extractFileName(url));
//        return;
        //byte[] bytesArray = new byte[4096];
         
//        int bytesRead = -1;
//        while ((bytesRead = inputStream.read(bytesArray)) != -1) {
//            buffOut.write(bytesArray, 0, bytesRead);
//        }

//            boolean success = f.completePendingCommand();
//            if (success) {
//
//                Toast.makeText(cordova.getActivity().getApplicationContext(), "File #2 has been downloaded successfully.", Toast.LENGTH_SHORT).show();
//                
//            }
//            buffOut.close();
//            inputStream.close();
//
//        Toast.makeText(cordova.getActivity().getApplicationContext(), "Debugueichon", Toast.LENGTH_SHORT).show();
//        teardown(f);
              
    //}    
    
    

    /**
     * Tears down the FTP connection
     *
     * @param f the FTPClient
     * @throws IOException
     */
    private void teardown(FTPClient f) throws IOException {
        f.logout();
        f.disconnect();
    }

    /**
     * Creates, connects and logs into a FTP server
     *
     * @param url of the FTP server
     * @return an instance of FTPClient
     * @throws IOException
     */
    private FTPClient setup(URL url) throws IOException {
        FTPClient f = new FTPClient();
        f.connect(url.getHost(), extractPort(url));

        StringTokenizer tok = new StringTokenizer(url.getUserInfo(), ":");
        f.login(tok.nextToken(), tok.nextToken());

        f.enterLocalPassiveMode();
        f.setFileType(FTP.BINARY_FILE_TYPE);

        return f;
    }

    /**
     * Extracts the port of the FTP server. Returns 21 by default.
     *
     * @param url
     * @return
     */
    private int extractPort(URL url) {
        if (url.getPort() == -1) {
            return url.getDefaultPort();
        } else {
            return url.getPort();
        }
    }

    /**
     * Extracts the file name from the URL.
     *
     * @param url of the ftp server, includes the file to upload/download
     * @return the filename to upload/download
     */
    private String extractFileName(URL url) {
        String filename = url.getFile();
        if (filename.endsWith(";type=i") || filename.endsWith(";type=a")) {
            filename = filename.substring(0, filename.length() - 7);
        }
        return filename;
    }
}
