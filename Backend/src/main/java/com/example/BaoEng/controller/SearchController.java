package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.SearchResponse;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.SearchService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ApiResponse<SearchResponse> search(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(value = "q", required = false) String q) {
        return ApiResponse.ok(searchService.search(principal, q), "OK");
    }
}
