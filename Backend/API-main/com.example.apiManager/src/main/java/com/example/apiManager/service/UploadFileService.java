package com.example.apiManager.service;

import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UploadFileService {
	Resource load (String filename) throws MalformedURLException;
	String copy(MultipartFile file) throws IOException;
	boolean delete (String filename);
}
