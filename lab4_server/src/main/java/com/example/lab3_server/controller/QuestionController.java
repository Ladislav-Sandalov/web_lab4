package com.example.lab3_server.controller;

import com.example.lab3_server.model.Question;
import com.example.lab3_server.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/questions")
@Tag(name = "Questions API", description = "API for managing questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    @Operation(
            summary = "Get all questions",
            description = "Returns a list of all questions in the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successful operation")
            }

    )
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping
    @Operation(
            summary = "Create a question",
            description = "Creates a new question in the database.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Question created"),
                    @ApiResponse(responseCode = "400", description = "Question limit reached")
            },
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Question text",
                    required = true,
                    content = @Content(schema = @Schema(type = "string"))
            )

    )
    public ResponseEntity<?> addQuestion(@RequestBody String questionText){
        try{
            Question question = questionService.addQuestion(questionText);
            return new ResponseEntity<>(question, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


    }
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete a question",
            description = "Deletes a question from database.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Question deleted"),
                    @ApiResponse(responseCode = "404", description = "Not found")
            }
    )
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return new ResponseEntity<>("Успешно удалено", HttpStatus.OK);
    }
    @PutMapping("/{id}")
    @Operation(
            summary = "Update a question",
            description = "Updates existing question by id.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Question updated"),
                    @ApiResponse(responseCode = "404", description = "Not found")
            },
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Question text",
                    required = true,
                    content = @Content(schema = @Schema(type = "string"))
            )
    )
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody String questionText){
        try {
            questionService.updateQuestion(id, questionText);
            return new ResponseEntity<>("Успешно изменено", HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/random")
    @Operation(
            summary = "Get random question",
            description = "Get a random question from the database",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successful operation, returns random question"),
                    @ApiResponse(responseCode = "404", description = "Not found")
            }
    )
    public ResponseEntity<Question> getRandomQuestion(){
        Question question = questionService.getRandomQuestion();
        return new ResponseEntity<>(question, HttpStatus.OK);
    }
}
