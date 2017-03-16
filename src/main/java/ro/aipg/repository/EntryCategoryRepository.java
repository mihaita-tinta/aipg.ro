package ro.aipg.repository;

import ro.aipg.domain.EntryCategory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EntryCategory entity.
 */
@SuppressWarnings("unused")
public interface EntryCategoryRepository extends JpaRepository<EntryCategory,Long> {

}
