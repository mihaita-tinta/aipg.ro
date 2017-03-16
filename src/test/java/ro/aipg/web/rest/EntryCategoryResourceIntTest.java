package ro.aipg.web.rest;

import ro.aipg.AipgApp;

import ro.aipg.domain.EntryCategory;
import ro.aipg.repository.EntryCategoryRepository;
import ro.aipg.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EntryCategoryResource REST controller.
 *
 * @see EntryCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AipgApp.class)
public class EntryCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EntryCategoryRepository entryCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntryCategoryMockMvc;

    private EntryCategory entryCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        EntryCategoryResource entryCategoryResource = new EntryCategoryResource(entryCategoryRepository);
        this.restEntryCategoryMockMvc = MockMvcBuilders.standaloneSetup(entryCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntryCategory createEntity(EntityManager em) {
        EntryCategory entryCategory = new EntryCategory()
            .name(DEFAULT_NAME);
        return entryCategory;
    }

    @Before
    public void initTest() {
        entryCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntryCategory() throws Exception {
        int databaseSizeBeforeCreate = entryCategoryRepository.findAll().size();

        // Create the EntryCategory
        restEntryCategoryMockMvc.perform(post("/api/entry-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entryCategory)))
            .andExpect(status().isCreated());

        // Validate the EntryCategory in the database
        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        EntryCategory testEntryCategory = entryCategoryList.get(entryCategoryList.size() - 1);
        assertThat(testEntryCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEntryCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entryCategoryRepository.findAll().size();

        // Create the EntryCategory with an existing ID
        entryCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntryCategoryMockMvc.perform(post("/api/entry-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entryCategory)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = entryCategoryRepository.findAll().size();
        // set the field null
        entryCategory.setName(null);

        // Create the EntryCategory, which fails.

        restEntryCategoryMockMvc.perform(post("/api/entry-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entryCategory)))
            .andExpect(status().isBadRequest());

        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntryCategories() throws Exception {
        // Initialize the database
        entryCategoryRepository.saveAndFlush(entryCategory);

        // Get all the entryCategoryList
        restEntryCategoryMockMvc.perform(get("/api/entry-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entryCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEntryCategory() throws Exception {
        // Initialize the database
        entryCategoryRepository.saveAndFlush(entryCategory);

        // Get the entryCategory
        restEntryCategoryMockMvc.perform(get("/api/entry-categories/{id}", entryCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entryCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntryCategory() throws Exception {
        // Get the entryCategory
        restEntryCategoryMockMvc.perform(get("/api/entry-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntryCategory() throws Exception {
        // Initialize the database
        entryCategoryRepository.saveAndFlush(entryCategory);
        int databaseSizeBeforeUpdate = entryCategoryRepository.findAll().size();

        // Update the entryCategory
        EntryCategory updatedEntryCategory = entryCategoryRepository.findOne(entryCategory.getId());
        updatedEntryCategory
            .name(UPDATED_NAME);

        restEntryCategoryMockMvc.perform(put("/api/entry-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntryCategory)))
            .andExpect(status().isOk());

        // Validate the EntryCategory in the database
        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeUpdate);
        EntryCategory testEntryCategory = entryCategoryList.get(entryCategoryList.size() - 1);
        assertThat(testEntryCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEntryCategory() throws Exception {
        int databaseSizeBeforeUpdate = entryCategoryRepository.findAll().size();

        // Create the EntryCategory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEntryCategoryMockMvc.perform(put("/api/entry-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entryCategory)))
            .andExpect(status().isCreated());

        // Validate the EntryCategory in the database
        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEntryCategory() throws Exception {
        // Initialize the database
        entryCategoryRepository.saveAndFlush(entryCategory);
        int databaseSizeBeforeDelete = entryCategoryRepository.findAll().size();

        // Get the entryCategory
        restEntryCategoryMockMvc.perform(delete("/api/entry-categories/{id}", entryCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EntryCategory> entryCategoryList = entryCategoryRepository.findAll();
        assertThat(entryCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntryCategory.class);
    }
}
