package ro.aipg.web.rest;

import com.codahale.metrics.annotation.Timed;
import ro.aipg.domain.EntryCategory;

import ro.aipg.repository.EntryCategoryRepository;
import ro.aipg.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EntryCategory.
 */
@RestController
@RequestMapping("/api")
public class EntryCategoryResource {

    private final Logger log = LoggerFactory.getLogger(EntryCategoryResource.class);

    private static final String ENTITY_NAME = "entryCategory";
        
    private final EntryCategoryRepository entryCategoryRepository;

    public EntryCategoryResource(EntryCategoryRepository entryCategoryRepository) {
        this.entryCategoryRepository = entryCategoryRepository;
    }

    /**
     * POST  /entry-categories : Create a new entryCategory.
     *
     * @param entryCategory the entryCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entryCategory, or with status 400 (Bad Request) if the entryCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entry-categories")
    @Timed
    public ResponseEntity<EntryCategory> createEntryCategory(@Valid @RequestBody EntryCategory entryCategory) throws URISyntaxException {
        log.debug("REST request to save EntryCategory : {}", entryCategory);
        if (entryCategory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new entryCategory cannot already have an ID")).body(null);
        }
        EntryCategory result = entryCategoryRepository.save(entryCategory);
        return ResponseEntity.created(new URI("/api/entry-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entry-categories : Updates an existing entryCategory.
     *
     * @param entryCategory the entryCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entryCategory,
     * or with status 400 (Bad Request) if the entryCategory is not valid,
     * or with status 500 (Internal Server Error) if the entryCategory couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entry-categories")
    @Timed
    public ResponseEntity<EntryCategory> updateEntryCategory(@Valid @RequestBody EntryCategory entryCategory) throws URISyntaxException {
        log.debug("REST request to update EntryCategory : {}", entryCategory);
        if (entryCategory.getId() == null) {
            return createEntryCategory(entryCategory);
        }
        EntryCategory result = entryCategoryRepository.save(entryCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entryCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entry-categories : get all the entryCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entryCategories in body
     */
    @GetMapping("/entry-categories")
    @Timed
    public List<EntryCategory> getAllEntryCategories() {
        log.debug("REST request to get all EntryCategories");
        List<EntryCategory> entryCategories = entryCategoryRepository.findAll();
        return entryCategories;
    }

    /**
     * GET  /entry-categories/:id : get the "id" entryCategory.
     *
     * @param id the id of the entryCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entryCategory, or with status 404 (Not Found)
     */
    @GetMapping("/entry-categories/{id}")
    @Timed
    public ResponseEntity<EntryCategory> getEntryCategory(@PathVariable Long id) {
        log.debug("REST request to get EntryCategory : {}", id);
        EntryCategory entryCategory = entryCategoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entryCategory));
    }

    /**
     * DELETE  /entry-categories/:id : delete the "id" entryCategory.
     *
     * @param id the id of the entryCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entry-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntryCategory(@PathVariable Long id) {
        log.debug("REST request to delete EntryCategory : {}", id);
        entryCategoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
